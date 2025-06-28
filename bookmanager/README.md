# Book Manager API (Django + PostgreSQL)

## Setup

1. Create virtual env & activate it:
```bash
python -m venv venv
source venv/bin/activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Setup PostgreSQL in `settings.py`:
- Name: `bookdb`
- User: `your_user`
- Password: `your_password`

4. Migrate & run:
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

API endpoints:
- GET/POST: `/api/books/`
- PUT/DELETE: `/api/books/<id>/`
