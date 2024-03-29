from fastapi_mail import FastMail, MessageSchema,ConnectionConfig
from typing import List
from fastapi import APIRouter
from random import randint
import schemas


router = APIRouter()

conf = ConnectionConfig(

    MAIL_USERNAME = "holeinthewallauth",
    MAIL_PASSWORD = "dcvnwjjajxgepxan",
    MAIL_PORT = 465, 
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_FROM = "aholeinthewallauth@gmail.com",
    MAIL_STARTTLS = False,
    MAIL_SSL_TLS = True,
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True
)




@router.post("/sendemail", status_code=200)
async def send_mail(email: schemas.EmailSchema):
 
    code = randint(100000, 999999)
    template = """
        <html>
        <body>
         
 
<p>Hi !!!
        <br>Thanks for signing up for our app!</p>
 <p>Here is your verification code: """ + str(code) + """</p>
 
        </body>
        </html>
        """
 
    message = MessageSchema(
        subject="Fastapi-Mail module",
        recipients=email.dict().get("Email"),
        body=template,
        subtype="html"
        )
 
    fm = FastMail(conf)
    await fm.send_message(message)
    print(message)
 
     
    
    return str(code)
