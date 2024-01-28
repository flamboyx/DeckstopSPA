import uuid

from django.db import models
from django.utils import timezone
from django.utils.timesince import timesince

from account.models import User


class Score(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    score = models.IntegerField(default=0)
    got_by = models.ForeignKey(User, related_name='scores', on_delete=models.CASCADE)
    got_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-score',)

    def got_at_formatted(self):
        return timesince(self.got_at)
