import nltk
from nltk.chat.util import Chat, reflections

pairs = [
    [
        r"my name is (.*)",
        ["Hello %1, How can I assist you with your academic progress?"]
    ],
    [
        r"what is your name ?",
        ["I am your academic progress assistant."]
    ],
    [
        r"how are you ?",
        ["I'm doing good. How can I help you today?"]
    ],
    [
        r"what can you do ?",
        ["I can help you track your academic progress, give study tips, and predict your exam scores based on study hours."]
    ],
    [
        r"how many hours should I study ?",
        ["You should ideally study for 2-3 hours daily to maintain good academic progress."]
    ],
    [
        r"how can I improve my grades ?",
        ["To improve your grades, create a study schedule, focus on understanding the concepts, and practice regularly."]
    ],
    [
        r"what is the best way to study ?",
        ["The best way to study is to find a quiet place, take regular breaks, and review your notes regularly."]
    ],
    [
        r"can you predict my exam score ?",
        ["I can help you with that. Please provide me with your study hours."]
    ],
    [
        r"(.*) study hours (.*)",
        ["You should ideally study for 2-3 hours daily to maintain good academic progress. Adjust based on your schedule."]
    ],
    [
        r"bye|exit",
        ["Goodbye! Have a great day!", "It was nice talking to you. Goodbye!"]
    ],
    [
        r"(.*)",
        ["I'm sorry, I didn't understand that. Can you please rephrase?"]
    ]
]

reflections = {
    "i am": "you are",
    "i was": "you were",
    "i": "you",
    "i'd": "you would",
    "i've": "you have",
    "i'll": "you will",
    "my": "your",
    "you are": "I am",
    "you were": "I was",
    "you've": "I have",
    "you'll": "I will",
    "your": "my",
    "yours": "mine",
    "you": "me",
    "me": "you"
}

chatbot = Chat(pairs, reflections)

def start_chatbot():
    print("Hi, I am your academic progress assistant. How can I help you today?")
    print("Type 'bye' or 'exit' to end the chat.")
    while True:
        user_input = input("You: ")
        if user_input.lower() in ["bye", "exit"]:
            print("Chatbot: Goodbye! Have a great day!")
            break
        response = chatbot.respond(user_input)
        print("Chatbot:", response)

if __name__ == "__main__":
    start_chatbot()
