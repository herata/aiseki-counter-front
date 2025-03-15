import json
from typing import Any, Dict

def lambda_handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    try:
        # リクエストボディの解析
        if isinstance(event.get('body'), str):
            body = json.loads(event['body'])
        else:
            body = event.get('body', {})
            
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Test response',
                'received': body
            }, ensure_ascii=False)
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': str(e)
            }, ensure_ascii=False)
        }