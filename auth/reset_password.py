from utils.token_manager import generate_token

def reset_password(email):
    token = generate_token()
    send_email(email, token)
