# How to run

### Frontend:
1-cd frontend <br />
2-npm install <br />
3-npm run build (This is important because django is going to serve files from the build folder) <br />

### Backend: <br />
1-cd backend <br />
2-pip install -r requirements.txt <br />
3-python manage.py runserver
** To access admin page you can use the super user admin/1234 **

# Third-party tools used:
1-react-bootstrap for styled components like List and Navbar<br />
2-react-icons for plus-icon and trash-icon<br />
3-redux for state management in react <br />
4-djangorestframework for serializers and APIView and Token Authentication<br />
5-celery and django-celery-beat for periodic task<br />

## How To Activate notifications:
1- Make sure there is a redis server running at port 6379<br />
2- Open a terminal in backend directory and run celery -A backend worker -l INFO<br />
3- Open another terminal in backend directory and run celery -A backend beat -l INFO<br />