from rest_framework import serializers

from account.serializers import UserSerializer

from .models import Score


class ScoreSerializer(serializers.ModelSerializer):
    got_by = UserSerializer(read_only=True)
    class Meta:
        model = Score
        fields = (
            "id",
            "score",
            "got_by",
            "got_at_formatted",
        )
