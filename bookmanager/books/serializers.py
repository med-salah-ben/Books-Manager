# books/serializers.py
from rest_framework import serializers
from .models import Book
from datetime import datetime

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

    def validate_titre(self, value):
        if not value.strip():
            raise serializers.ValidationError("The title cannot be empty.")
        if len(value) < 2:
            raise serializers.ValidationError("The title must be at least 2 characters long.")
        return value

    def validate_auteur(self, value):
        if not value.strip():
            raise serializers.ValidationError("The author cannot be empty.")
        return value

    def validate_annee(self, value):
        current_year = datetime.now().year
        if value < 1000 or value > current_year:
            raise serializers.ValidationError(f"The year must be between 1000 and {current_year}.")
        return value
