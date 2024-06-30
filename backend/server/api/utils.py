def getVenue(venueDetailsRaw):
    venueDetails = {}
    venueDetails['name'] = venueDetailsRaw.get('name', '')
    venueDetails['address'] = f"{venueDetailsRaw.get('address', {}).get('line1', '')}, {venueDetailsRaw.get('city', {}).get('name', '')}, {venueDetailsRaw.get('state', {}).get('stateCode', '')}"
    venueDetails['phoneNumber'] = venueDetailsRaw.get('boxOfficeInfo', {}).get('phoneNumberDetail', '')
    venueDetails['openHours'] = venueDetailsRaw.get('boxOfficeInfo', {}).get('openHoursDetail', '')
    venueDetails['generalRule'] = venueDetailsRaw.get('generalInfo',{}).get('generalRule', '')
    venueDetails['childRule'] = venueDetailsRaw.get('generalInfo', {}).get('childRule', '')
    venueDetails['lat'] = venueDetailsRaw.get('location', {}).get('latitude', '')
    venueDetails['long'] = venueDetailsRaw.get('location', {}).get('longitude', '')

    return venueDetails

def getEvent(eventDetailsRaw):
    eventDetails = {}
    eventDetails['id'] = eventDetailsRaw.get('id', '')
    if 'dates' in eventDetailsRaw:
        start_date = eventDetailsRaw['dates']['start'].get('localDate', '')
        start_time = eventDetailsRaw['dates']['start'].get('localTime', '')
        eventDetails['date'] = f"{start_date} {start_time}"
    else:
        eventDetails['date'] = ''
    
    eventDetails['name'] = eventDetailsRaw.get('name', '')
    eventDetails['url'] = eventDetailsRaw.get('url', '')
    eventDetails['venue'] = eventDetailsRaw['_embedded'].get('venues', [{}])[0].get('name', '')

    
    eventDetails['artist'] = eventDetailsRaw.get('_embedded', {}).get('attractions', '')
    priceRanges = eventDetailsRaw.get('priceRanges', [])
    if priceRanges:
        priceRanges = priceRanges[0]
        eventDetails['minPrice'] = priceRanges.get('min', '')
        eventDetails['maxPrice'] = priceRanges.get('max', '')
        eventDetails['currency'] = priceRanges.get('currency', '')
    else:
        eventDetails['minPrice'] = ''
        eventDetails['maxPrice'] = ''
        eventDetails['currency'] = ''

    eventDetails['status'] = eventDetailsRaw.get('dates', {}).get('status', {}).get('code', '')

    eventDetails['seatmap'] = eventDetailsRaw.get('seatmap', {}).get('staticUrl', '')

    eventDetails['genre'] = []
    classifcation = eventDetailsRaw.get('classifications', [{}])[0]
    
    segment = classifcation.get('segment', {}).get('name', '')
    genre = classifcation.get('genre', {}).get('name', '')
    subGenre = classifcation.get('subGenre', {}).get('name', '')
    type = classifcation.get('type', {}).get('name', '')
    subType = classifcation.get('subType', {}).get('name', '')
    eventDetails['genre'] = [segment, genre, subGenre, type, subType] 

    eventDetails['genre'] = [i for i in eventDetails['genre'] if 'genre' in eventDetails and i!='' and i.lower() != 'undefined']

    return eventDetails