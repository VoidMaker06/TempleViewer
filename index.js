function dictGet(dict, key) {
    if (key in dict) return dict[key];
    else return null;
}

function appendIfExists(element, ...args) {
    args.forEach(arg => element.appendChild(arg))}

function create_element(tag, attributes) {
    let element = document.createElement(tag);
    for (const [key, value] of Object.entries(attributes)) {
        if (key !== 'style') element[key] = value;
        else {
            for (const [key1, value1] of Object.entries(value)) {
                element['style'][key1] = value1;
            }
        }
    }

    return element;
}

function information_container(info, img_id) {
    function separator() {
        return create_element('div', {'className':'separator'});
    }

    let image = `assets/images/${img_id}.jpg`;
    let title = dictGet(info, 'title');
    let desc = dictGet(info, 'description');
    let rel_dist = dictGet(info, 'relative_distance');
    let timings = dictGet(info, 'timings');
    let maps_address = dictGet(info, 'maps_address');

    let container = create_element('div', {'className': 'info-container'});
    let imageDiv = create_element('div', {'className': 'images'});
    imageDiv.appendChild(create_element('img', {'src': image, 'className':'image'}));
    let titleSpan = create_element('span', {'className': 'title', 'innerText': title});
    let descSpan = create_element('span',
            {'className': 'description', 'innerText': desc});
    let relDistSpan = create_element('span',
            {'className': 'relative-distance', 'innerText': rel_dist+' away'});
    let mapsAddressSpan = create_element('span',
            {'className': 'maps-address', 'innerText': maps_address});

    let timingsDiv = create_element('div', {'className': 'timings'});


    if (timings !== null) {
        ['Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday', 'Sunday']
                .forEach(day => {
                    let timingsItem = create_element('div', {'className': 'timing-item'});
                    let day_timings = dictGet(timings, day);
                    let dayTimingsDiv = create_element('div', {'className': 'day-timing'});

                    day_timings.forEach(daytiming => {
                        dayTimingsDiv.appendChild(create_element('span',
                                {'innerText': daytiming},))
                    })

                    timingsItem.appendChild(create_element('span',
                            {'innerText':day, 'className':'day'}))

                    timingsItem.appendChild(dayTimingsDiv);

                    timingsDiv.appendChild(timingsItem);
                })
    }

    else timingsDiv.appendChild(create_element('span',
            {'innerText':'Timing Details Not Available'}));




    container.appendChild(imageDiv);
    container.appendChild(titleSpan);
    container.appendChild(mapsAddressSpan);
    container.appendChild(relDistSpan);
    container.appendChild(separator());
    container.appendChild(descSpan);
    container.appendChild(timingsDiv);

    return container;


}

function information_card(info) {
    if (dictGet(info, 'title') !== null) {
        var title = create_element('span',
                {'className': 'title', 'innerText': dictGet(info, 'title')});
    }

    if (dictGet(info, 'maps_address') !== null) {
        var maps_address = create_element('span',
                {
                    'className': 'maps-address', 'innerText':
                            dictGet(info, 'maps_address')
                });
    }

    if (dictGet(info, 'relative_distance') !== null) {
        var relative_distance = create_element('span',
                {'className': 'relative-distance', 'innerText':
                            dictGet(info, 'relative_distance')});
    }

    let card = create_element('div', {'className': 'info-card'});
    appendIfExists(card, title, maps_address, relative_distance);

    return card;
}

temple_data = undefined

fetch('assets/temp.json').then(response => response.json()
).then(data => {
    temple_data  = data

    let infoCards = create_element('div', {'className': 'info-cards'});
    data.forEach((item) => {
        infoCards.appendChild(information_card(item))
    })

    document.querySelector('body').appendChild(infoCards);
    document.querySelector('body').appendChild(information_container(data[0], 1));
    document.querySelector('body').appendChild(
            create_element('img', {'src':'assets/images/img.png', className: 'map'})
    );
});