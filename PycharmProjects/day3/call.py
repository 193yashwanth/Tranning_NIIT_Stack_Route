import  requests

response=requests.get("https://dummyjson.com/products/1")
print(response.json())