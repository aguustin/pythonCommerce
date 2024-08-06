FROM python:3.9.19-slim-bullseye

ENV PYTHONUNBUFFERED 1

RUN mkdir /code

WORKDIR /code

COPY requirements.txt /code/

RUN pip install -r requirements.txt && pip install --upgrade pip && pip install djangorestframework && pip install django-cors-headers && pip install cloudinary && pip install django-cloudinary-storage && pip install coreapi

COPY . /python-back

EXPOSE 8080

CMD ["python", "manage.py", "runserver"] 