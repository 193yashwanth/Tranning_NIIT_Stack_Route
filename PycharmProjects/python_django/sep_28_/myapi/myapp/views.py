from django.http import JsonResponse

# Create your views here.
def item_list(request):
    items = [
        {"name": "Item 1", "description": "Description for Item 1"},
        {"name": "Item 2", "description": "Description for Item 2"}
    ]
    return JsonResponse({"items": items})
