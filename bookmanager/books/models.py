from django.db import models

class Book(models.Model):
    titre = models.CharField(max_length=255)
    auteur = models.CharField(max_length=255)
    annee = models.IntegerField()

    def __str__(self):
        return self.titre
