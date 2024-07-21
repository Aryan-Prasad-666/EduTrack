#Libraries
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt

#take subject inout
sub1= input("Enter the name of subject 1:")
sub2= input("Enter the name of subject 2:")
sub3= input("Enter the name of subject 3:")
print()

testcount= int(input("Enter the number of tests you have given: "))
testlist=range(testcount)
print()

sub1list=[]
sub2list=[]
sub3list=[]
##input test scores of the student 
print(f"Enter marks of {sub1}")
for i in testlist:
    score= int(input(f"Enter {sub1} marks of Test {i+1}: "))
    sub1list.append(score)

print(f"Enter marks of {sub2}")
for i in testlist:
    score= int(input(f"Enter {sub2} marks of Test {i+1}: "))
    sub2list.append(score)

print(f"Enter marks of {sub3}")
for i in testlist:
    score= int(input(f"Enter {sub3} marks of Test {i+1}: "))
    sub3list.append(score)
testTup = tuple(testlist)
sub1Tup = tuple(sub1list)
sub2Tup = tuple(sub2list)
sub3Tup = tuple(sub3list)

#Data preparation
data = {
    'Test': testTup,
     sub1 : sub1Tup,
     sub2 : sub2Tup,
     sub3 : sub3Tup
}

df = pd.DataFrame(data)

#features 
X = df[['Test']].values
y_sub1 = df[sub1].values
y_sub2 = df[sub2].values
y_sub3 = df[sub3].values

#create model
sub1Model= LinearRegression()
sub2Model = LinearRegression()
sub3Model = LinearRegression()

#train the models
sub1Model.fit(X,y_sub1)
sub2Model.fit(X,y_sub2)
sub3Model.fit(X,y_sub3)

nextTest = np.array([[testcount]])
sub1PredictedMarks = sub1Model.predict(nextTest)[0]
sub2PredictedMarks = sub2Model.predict(nextTest)[0]
sub3PredictedMarks = sub3Model.predict(nextTest)[0]
# Clip the predicted scores to the range [0, 100]
sub1PredictedMarks = np.clip(sub1PredictedMarks,0,100)
sub2PredictedMarks = np.clip(sub2PredictedMarks,0,100)
sub3PredictedMarks = np.clip(sub3PredictedMarks,0,100)

#print the results
print(f"Predicted {sub1} marks for next test is: {sub1PredictedMarks}")
print(f"Predicted {sub2} marks for next test is: {sub2PredictedMarks}")
print(f"Predicted {sub3} marks for next test is: {sub3PredictedMarks}")

#comments
if sub1PredictedMarks < 60 :
    print(f"You might get less marks in {sub1}, please concentrate more on {sub1}!")
if sub2PredictedMarks < 60 :
    print(f"You might get less marks in {sub2}, please concentrate more on {sub2}!")
if sub3PredictedMarks < 60 :
    print(f"You might get less marks in {sub3}, please concentrate more on {sub3}!")

#plotting graph of three subjects
#sort the dataframe
df = df.sort_values(by='Test')
plt.figure(figsize=(10, 6))
plt.plot(df['Test'], df[sub1], marker='o', linestyle='-', color='b', label= sub1)
plt.plot(df['Test'], df[sub2], marker='o', linestyle='-', color='g', label= sub2)
plt.plot(df['Test'], df[sub3], marker='o', linestyle='-', color='r', label= sub3)

plt.xlabel('Test Number')
plt.ylabel('Marks')
plt.title('Graph for Test marks')
plt.xticks(df['Test'])  
plt.grid(True)
plt.legend()
plt.tight_layout()
plt.show()
plt.close('all')