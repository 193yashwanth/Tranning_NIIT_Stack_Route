from flask import Flask, request, jsonify
from flask_cors import CORS
import razorpay

app = Flask(__name__)
CORS(app)

razorpay_client = razorpay.Client(auth=("rzp_test_trq1AEYNEvNzch", "FembI5GMe0c3mgMCmCkLXTcN"))


@app.route('/verify-payment', methods=['POST'])
def verify_payment():
    try:
        data = request.get_json()
        payment_id = data.get('payment_id')
        amount = data.get('amount')

        if not payment_id or not amount:
            return jsonify({'error': 'Invalid payment data'}), 400

        # For this example, we'll just return a success response
        return jsonify({'success': True, 'message': 'Payment verified'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(port=5500)