from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def plan_task(user_command):

    prompt = f"""
You are a browser automation planner.

Convert the user's request into one action.

Possible actions:

GOOGLE_SEARCH:<query>

OPEN:https://...

User Request:
{user_command}

Return only the action.
"""

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {"role":"user","content":prompt}
        ]
    )

    return response.choices[0].message.content.strip()