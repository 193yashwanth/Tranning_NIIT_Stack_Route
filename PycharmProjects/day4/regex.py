import re
a='hello world'
b=re.search("^he.*ld$",a)
if b:
  print("YES! We have a match!")
else:
  print("No match")
