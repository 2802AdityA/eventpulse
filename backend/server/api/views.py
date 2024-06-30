from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests
from .utils import getVenue, getEvent

TICKETMASTER_API_KEY = "YOUR_TICKETMASTER_API_KEY"
BASE_URL = 'https://app.ticketmaster.com/discovery/v2'

@api_view(['GET'])
def getKeywordSuggestions(request):
    params = request.query_params
    params = dict(params)
    params['apikey'] = TICKETMASTER_API_KEY

    url = f"{BASE_URL}/suggest"
    
    response = requests.get(url, params=params)
    responseData = response.json()
    
    embedded = responseData.get('_embedded', {})
    attractions = embedded.get('attractions', [])
    suggestions = []
    
    if(len(attractions) > 0):
        suggestions = [i.get('name', '') for i in attractions if 'name' in i]

    return Response(suggestions)

@api_view(['GET'])
def getEvents(request):
    params = request.query_params
    params = dict(params)
    params['apikey'] = TICKETMASTER_API_KEY
    
    url = f"{BASE_URL}/events.json"
    
    response = requests.get(url, params=params)
    responseData = response.json()
    
    if responseData['page']['totalElements'] == 0:
        return Response([{'message': 'No data found'}], status=404)
    
    events = responseData['_embedded']['events']
    data = []
    for i in events:
        data.append({
            'id': i.get('id', ''),
            'Date/Time':f"{i['dates']['start'].get('localDate', '')} {i['dates']['start'].get('localTime','')}" if 'dates' in i else '',
            'Icon': i.get('images', [{}])[0].get('url', ''),
            'Event': i.get('name', ''),
            'Genre': i.get('classifications', [{}])[0].get('segment', {}).get('name', ''),
            'Venue': i['_embedded'].get('venues', [{}])[0].get('name', ''),
        })
    
    response = Response(data)
    
    return response  

@api_view(['GET'])
def getEventDetails(request):
    params = request.query_params
    params = dict(params)
    params['apikey'] = TICKETMASTER_API_KEY
    
    url = f"{BASE_URL}/events";
    response = requests.get(url, params)
    responseData = response.json()
    eventDetailsRaw = responseData['_embedded']['events'][0];

    eventDetails = getEvent(eventDetailsRaw)

    venueDetailsRaw = responseData['_embedded']['events'][0]['_embedded'].get('venues', [{}])[0]
    venueDetails = getVenue(venueDetailsRaw)

    return Response(data={'eventDetails': eventDetails, 'venueDetails': venueDetails, 'responseData': responseData})

