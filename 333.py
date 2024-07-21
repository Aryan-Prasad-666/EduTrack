import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

#data of study,sleep, atendence and marks
data = {
    'studyHours': [2,3,4,5,6,7,8,9,10],
    'sleepHours': [8,7,6,7,8,9,6,7,9],
    'attendance': [75,80,85,70,90,95,60,85,80],
    'marks': [50,55,60,65,70,75,60,70,76]
}

df = pd.DataFrame(data)

X = df[['studyHours','sleepHours','attendance']]
y = df['marks']
#(train with first 8 data features)
XTrain, XTest, yTrain, yTest = train_test_split(X, y, test_size=0.1, random_state=42)
#model
model = LinearRegression()
model.fit(XTrain, yTrain)

#predictions and printt
yPredict = model.predict(XTest)
print(f'the predicted marks for 10 hours of sleep, 9hours of study and 80% attendence is: {yPredict}')
