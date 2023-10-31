file_path = "C:/Users/VMAdmin/Documents/example.txt"
with open(file_path, 'w') as file:
    file.write('hello,this')
print('successfully')

with open("C:/Users/VMAdmin/Documents/example.txt", "r") as file:
    for i in file:
        print(i.strip())

with open("C:/Users/VMAdmin/Documents/example.txt", "a") as file:
    file.write("\n this is additional information")

import csv
data = [["Name", "Age"], ["Alice", 20], ["Bob", 30]]
with open("C:/Users/VMAdmin/Documents/data.csv", "w", newline="")as file:
    writer = csv.writer(file)
    writer.writerows(data)

with open("C:/Users/VMAdmin/Documents/data.csv", "r")as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)

import json

data={"name":"aalice","age":30,"city":"new york"}
with open("C:/Users/VMAdmin/Documents/data.json","w") as file:
    json.dump(data,file)
with open("C:/Users/VMAdmin/Documents/data.json","r") as file:
    load=json.load(file)
    print(load)