def reset_password(email):
    token = generate_token()
    send_email(email, token)
