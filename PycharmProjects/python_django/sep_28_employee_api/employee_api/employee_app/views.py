from django.http import JsonResponse

# Create your views here.
def employee_list(request):
    items = [
        {"id": 3456, "ph": 123456789, "lh": 123456780, "address": "near"},
        {"id": 34589, "ph": 234567890, "lh": 2345678, "address": "far"},
        {"id": 45678, "ph": 345678, "lh": 234567, "address": "here"}

    ]
    return JsonResponse({"items": items})
