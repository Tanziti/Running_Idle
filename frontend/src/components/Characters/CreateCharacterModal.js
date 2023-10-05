// CharacterForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { composeCharacter } from '../../store/characters'

const CharacterForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState('');
    const [outfit, setOutfit] = useState('red'); // Default to 'red'
    const [shoes, setShoes] = useState('red'); // Default to 'red'
    const initialFormData = {
        heart: 0,
        legs: 0,
        arms: 0,
        points: 0,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        // Create formData object with the new name value
        const formData = {
            name,
            outfit,
            shoes,
            ...initialFormData, // Include other fields with initial values
        };

        await dispatch(composeCharacter(formData));
        window.location.reload()

        // history.push('/user/characters'); // Replace '/success-page' with your desired URL
        } catch (error) {
        console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update the name input value
            required
        />

        {/* Radio buttons for outfit */}
        <div>
            <label>Outfit Color:</label>
            <label>
            <input
                type="radio"
                name="outfit"
                value="red"
                checked={outfit === 'red'}
                onChange={() => setOutfit('red')}
            />
            Red
            </label>
            <label>
            <input
                type="radio"
                name="outfit"
                value="yellow"
                checked={outfit === 'yellow'}
                onChange={() => setOutfit('yellow')}
            />
            Yellow
            </label>
            <label>
            <input
                type="radio"
                name="outfit"
                value="green"
                checked={outfit === 'green'}
                onChange={() => setOutfit('green')}
            />
            Green
            </label>
        </div>

        {/* Radio buttons for shoes */}
        <div>
            <label>Shoes Color:</label>
            <label>
            <input
                type="radio"
                name="shoes"
                value="red"
                checked={shoes === 'red'}
                onChange={() => setShoes('red')}
            />
            Red
            </label>
            <label>
            <input
                type="radio"
                name="shoes"
                value="yellow"
                checked={shoes === 'yellow'}
                onChange={() => setShoes('yellow')}
            />
            Yellow
            </label>
            <label>
            <input
                type="radio"
                name="shoes"
                value="green"
                checked={shoes === 'green'}
                onChange={() => setShoes('green')}
            />
            Green
            </label>
        </div>

        {/* Other form fields can be added but won't be editable by the user */}
        <button type="submit">Submit</button>
        </form>
    );
};

export default CharacterForm;
