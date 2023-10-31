from django.db import models

# Create your models here.
class Employee(models.Model):
    psid = models.IntegerField()
    ph = models.IntegerField()
    lh = models.IntegerField()
    address = models.TextField()

    def __str__(self):
        return self.name
