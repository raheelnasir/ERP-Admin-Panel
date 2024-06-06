'use client';
import React, { useState } from 'react';
import { createCustomer } from '@/app/lib/createcustomeraction'; // Ensure this path matches your project structure

const CustomerForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('imageUrl', imageUrl);

        const result = await createCustomer({}, formData);

        if (result && result.errors) {
            setErrors(result.errors);
            setMessage(result.message);
        } else {
            setMessage('Customer created successfully.');
            setName('');
            setEmail('');
            setImageUrl('');
            setErrors({});
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Create Customer</h2>
                {message && <div className="mb-4 text-red-500">{message}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : ''}`}
                            required
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name[0]}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                            required
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email[0]}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="imageUrl" className="block text-gray-700 font-medium mb-2">
                            Image URL
                        </label>
                        <input
                            type="text"
                            id="imageUrl"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.imageUrl ? 'border-red-500' : ''}`}
                            required
                        />
                        {errors.imageUrl && <span className="text-red-500 text-sm">{errors.imageUrl[0]}</span>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Create Customer
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CustomerForm;
