# pull official base image
FROM python:2.7.18-stretch

# Installing client libraries and any other package you need
RUN apt update
# RUN apt install -y python3-psycopg2

# RUN apt install -y imagemagick

# set work directory
WORKDIR /usr/src/app

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# copy project
COPY . .

EXPOSE 8000

CMD ["python", "manage.py", "runserver"]