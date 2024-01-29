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


@api_view(['GET'])
def get_hiscore(request):
    user_id = request.user.id
    scores = Score.objects.filter(got_by=user_id).order_by('-score')

    if scores:
        hiscore = scores[0]
        serializer = ScoreSerializer(hiscore)

        return JsonResponse(serializer.data, safe=False)
    else:
        return JsonResponse('There is no hiscore for current player', safe=False)


@api_view(['POST'])
def score_create(request):
    form = ScoreForm(request.data)

    if form.is_valid():
        score = form.save(commit=False)

        user_id = request.user.id
        scores = Score.objects.filter(got_by=user_id)
        if scores:
            hiscore = scores[0]
            if score.score > hiscore.score:
                hiscore.delete()
                score.got_by = request.user
                score.save()

                serializer = ScoreSerializer(score)

                return JsonResponse(serializer.data, safe=False)
            else:
                return JsonResponse('New score is smaller than the hiscore', safe=False)
        else:
            score.got_by = request.user
            score.save()

            serializer = ScoreSerializer(score)

            return JsonResponse(serializer.data, safe=False)
    else:
        return JsonResponse({'error': 'something is wrong with score'})
