from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
import openai
import csv
import os

app = FastAPI()

class Lead(BaseModel):
    name: str
    industry: str
    specific_area: str

class Reply(BaseModel):
    reply: str

@app.post("/generate-message")
async def generate_message(lead: Lead):
    prompt = f"Generate a personalized outreach message for {lead.name} in {lead.industry} focusing on {lead.specific_area}."
    response = openai.Completion.create(
        engine="gpt-4o",
        prompt=prompt,
        max_tokens=150
    )
    message = response.choices[0].text.strip()
    return {"message": message}

@app.post("/classify-reply")
async def classify_reply(reply: Reply):
    prompt = (
        "Classify the following reply as Positive, Neutral, Negative, or Ignore: "
        f"{reply.reply}"
    )
    response = openai.Completion.create(
        engine="gpt-4o",
        prompt=prompt,
        max_tokens=10
    )
    classification = response.choices[0].text.strip()
    return {"classification": classification}

@app.post("/upload-leads")
async def upload_leads(file: UploadFile = File(...)):
    file_location = f"output/{file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())
    return {"info": f"file '{file.filename}' saved at '{file_location}'"}

@app.post("/upload-replies")
async def upload_replies(file: UploadFile = File(...)):
    file_location = f"output/{file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())
    return {"info": f"file '{file.filename}' saved at '{file_location}'"} 