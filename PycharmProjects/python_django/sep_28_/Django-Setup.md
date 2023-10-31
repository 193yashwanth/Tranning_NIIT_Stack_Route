To create a Django project that can be called from Postman, you can follow these steps:

1. **Create a New Django Project:**

First, create a new Django project by running the following command in your terminal:

```bash
django-admin startproject myapi
cd myapi
```

2. **Create a Django App:**

Next, create a Django app within your project to handle the API functionality:

```bash
python manage.py startapp myapp
```

3. **Define a Model (Optional):**

You can define a model in your app to represent data. For example, let's create a simple model in `myapp/models.py`:

```python
from django.db import models

class Item(models.Model):
name = models.CharField(max_length=100)
description = models.TextField()

def __str__(self):
return self.name
```

Don't forget to run `python manage.py makemigrations` and `python manage.py migrate` to apply the model changes to the database.

4. **Create API Views:**

In `myapp/views.py`, create views for your API endpoints. Here's an example of a simple API that lists items:

```python
from django.http import JsonResponse
from .models import Item

def item_list(request):
items = Item.objects.all().values('name', 'description')
return JsonResponse({"items": list(items)})
```

5. **Configure URLs:**

Define URL patterns for your API in `myapp/urls.py`. For example:

```python
from django.urls import path
from . import views

urlpatterns = [
path('api/items/', views.item_list, name='item-list'),
]
```

5.1. **Configure myapi-URLs:**

Define URL patterns for your API in `myapi/urls.py`. For example:

```python
from django.contrib import admin
from django.urls import include, path


urlpatterns = [
path('', include('myapp.urls')),
path('admin/', admin.site.urls),
]
```


6. **Configure Django Project Settings:**

Add your app to the `INSTALLED_APPS` list in `myapi/settings.py`:

```python
INSTALLED_APPS = [
# ...
'myapp',
# ...
]
```

7. **Run the Development Server:**

Start the Django development server:

```bash
python manage.py runserver
```

Your Django API should now be running locally.

8. **Testing with Postman:**

You can use Postman to make requests to your Django API. For example, to retrieve a list of items, make a GET request to `http://localhost:8000/api/items/` (replace `localhost:8000` with your server's address if necessary). You should receive a JSON response containing your items.