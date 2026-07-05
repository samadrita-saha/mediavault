from pydantic import BaseModel, EmailStr


class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    username: str
    password: str


class RegisterResponse(BaseModel):
    id: int
    username: str
    email: EmailStr


class LoginResponse(BaseModel):
    access_token: str
    token_type: str
