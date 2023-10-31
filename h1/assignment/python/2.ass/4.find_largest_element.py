def lar(b):
    c=b[0]
    for i in b:
        if i >= c:
            c = i
    return c

a=list(map(int,input("enter the numbers :").split()))
print(max(a))
print("largest no:", lar(a))