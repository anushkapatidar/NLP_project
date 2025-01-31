

from flask import Flask, request, jsonify, render_template

import joblib

app = Flask(__name__, template_folder='templates')

# Load your trained model and vectorizer
model = joblib.load('models/logistic_regression_model.pkl')
vectorizer = joblib.load('models/tfidf_vectorizer.pkl')
# Home route
@app.route("https://textclassifier.netlify.app/templates/index.html")
def home():
    return render_template("index.html")


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data['text']
    # print(text)
    # text = preprocess_text(text)
    vectorized_text = vectorizer.transform([text])
    prediction = model.predict(vectorized_text)[0]
    confidence = max(model.predict_proba(vectorized_text)[0]) * 100
    # print(prediction)
    return jsonify({'sentiment': 'positive' if prediction == 'positive' else 'negative', 'confidence': round(confidence, 2)})

if __name__ == '__main__':
    app.run(debug=True)
