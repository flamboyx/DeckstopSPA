from django.db.migrations import serializer
from django.http import JsonResponse

from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .forms import ScoreForm
from .models import Score
from .serializers import ScoreSerializer


@api_view(['GET'])
def score_list(request):
    scores = Score.objects.all()

    serializer = ScoreSerializer(scores, many=True)

    return JsonResponse(serializer.data, safe=False)


@api_view(['POST'])
def score_create(request):
    form = ScoreForm(request.data)

    if form.is_valid():
        score = form.save(commit=False)
        score.got_by = request.user
        score.save()

        serializer = ScoreSerializer(score)

        return JsonResponse(serializer.data, safe=False)
    else:
        return JsonResponse({'error': 'something is wrong with score'})
