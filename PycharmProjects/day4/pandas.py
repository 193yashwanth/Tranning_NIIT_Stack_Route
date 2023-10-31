import pandas as pd

data = pd.read_csv("C:/Users/VMAdmin/Documents/data.csv")
print(data.head())

data_dict = {
    "name": ["alice", 'bob', 'charlie'],
    "age": [25, 30, 33],
    'city': ['new york', 'los angles', 'chicago']
}
df = pd.DataFrame(data_dict)
print(df)
# selecting a single column
ages = df['age']
print(ages)
# selecting multiple column
subset = df[['name', 'age']]
print(subset)
# filtering based on a condition
adults = df[df['age'] >= 18]
print('adults:\n', adults)
# grouping by a column and calculation mean age
grouped = df.groupby('city')['age'].mean()
print('mean age by city : \n', grouped)
# sorting the dataframe by age in descending order
sorted_df = df.sort_values(by='age', ascending=False)
print('sorted dataframe "\n', sorted_df)
# adding a new column
df['gender'] = ['female', 'male', 'male']
print('dataframe with gender"\n', df)
# removing a column
df.drop(columns=['gender'], inplace=True)
print('dataframe after removing gender"\n', df)


# applying a custom function to the age column
def classify_age(age):
    if age < 25:
        return 'young'
    elif age >= 25 and age < 40:
        return 'adult'
    else:
        return 'senior'


df['ade_category'] = df['age'].apply(classify_age)
print('dataframe with age categories: \n', df)
