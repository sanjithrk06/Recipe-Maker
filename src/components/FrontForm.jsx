import React from 'react';
import bg from '../assets/formBg.jpg';
import { useRecipe } from '../context/RecipeContext';
import { useState } from 'react';


const FrontForm = ({ handleTypeChange }) => {
    const { updateRecipe } = useRecipe();

    const [formData, setFormData] = useState({
      name: '',
      author: '',
      cuisine: '',
      category: '',
      servings: '',
      prep_time_min: '',
      origin: '',
      source: ''
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleNext = () => {
      updateRecipe(formData);
      handleTypeChange('spices');
    };

    return (
        <>
        <section
            className="relative min-h-screen flex items-center justify-center bg-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
            <div className="max-w-[90%] md:max-w-[70%] w-full space-y-8 p-10 border-gray-400 rounded-xl shadow-lg z-10"
            style={{
                backgroundColor: '#7a7a7a5e',
                backdropFilter: 'blur(60px)'
            }}
            >
            <div className="grid gap-8 grid-cols-1">
                <div className="flex flex-col">
                <div className="flex mb-4 items-center justify-center">
                    <h1 className="font-bold text-3xl items-center text-[#ffb53d]">
                    Recipe Maker
                    </h1>
                </div>
                <div className="mt-5">
                    <div className="form">
                    <div className="md:flex flex-row md:space-x-4 w-full text-sm">
                        <div className="mb-3 space-y-2 w-full text-sm">
                        <label className="font-semibold text-[#ffb53d] py-2">
                            Recipe Name*
                        </label>
                        <input
                            placeholder="Recipe Name"
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker rounded-xl h-10 px-4 outline-none focus:ring-2 focus:ring-orange-200"
                            required
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <p className="text-red text-xs hidden">
                            Please fill out this field.
                        </p>
                        </div>
                        <div className="mb-3 space-y-2 w-full text-sm">
                        <label className="font-semibold text-[#ffb53d] py-2">
                            Author*
                        </label>
                        <input
                            placeholder="Author Name"
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker rounded-xl h-10 px-4 outline-none focus:ring-2 focus:ring-orange-200"
                            required
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleInputChange}
                        />
                        <p className="text-red text-xs hidden">
                            Please fill out this field.
                        </p>
                        </div>
                    </div>
                    <div className="md:flex md:flex-row md:space-x-4 w-full text-sm mb-4">
                        <div className="w-full flex flex-col mb-3">
                        <label className="font-semibold text-[#ffb53d] py-2">
                            Cuisine*
                        </label>
                        <select
                            className="block w-full bg-grey-lighter text-grey-darker outline-none focus:ring-2 focus:ring-orange-200 rounded-xl h-10 px-4 md:w-full"
                            required
                            name="cuisine"
                            value={formData.cuisine}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Cuisine</option>
                            <option value="None">None</option>
                        </select>
                        <p className="text-sm text-red-500 hidden mt-3" id="error">
                            Please fill out this field.
                        </p>
                        </div>
                        <div className="w-full flex flex-col mb-3">
                        <label className="font-semibold text-[#ffb53d] py-2">
                            Category*
                        </label>
                        <select
                            className="block w-full bg-grey-lighter text-grey-darker outline-none focus:ring-2 focus:ring-orange-200 rounded-xl h-10 px-4 md:w-full"
                            required
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Category</option>
                            <option value="None">None</option>
                        </select>
                        <p className="text-sm text-red-500 hidden mt-3" id="error">Please fill out this field.</p>
                        </div>
                        <div className="w-full flex flex-col mb-3">
                        <label className="font-semibold text-[#ffb53d] py-2">
                            Serving Size*
                        </label>
                        <select
                            className="block w-full bg-grey-lighter text-grey-darker outline-none focus:ring-2 focus:ring-orange-200 rounded-xl h-10 px-4 md:w-full"
                            required
                            name="servings"
                            value={formData.servings}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Size</option>
                            <option value="None">None</option>
                        </select>
                        <p className="text-sm text-red-500 hidden mt-3" id="error">Please fill out this field.</p>
                        </div>
                    </div>
                    <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                        <div className="mb-3 space-y-2 w-full text-sm">
                        <label className="font-semibold text-[#ffb53d] py-2">
                            Preparation Time*
                        </label>
                        <input
                            placeholder="(in minutes)"
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker rounded-xl h-10 px-4 outline-none focus:ring-2 focus:ring-orange-200"
                            required
                            type="number"
                            name="prep_time_min"
                            value={formData.prep_time_min}
                            onChange={handleInputChange}
                        />
                        <p className="text-red text-xs hidden">
                            Please fill out this field.
                        </p>
                        </div>
                        <div className="mb-3 space-y-2 w-full text-sm">
                        <label className="font-semibold text-[#ffb53d] py-2">
                            Recipe Origin*
                        </label>
                        <input
                            placeholder="Origin Name"
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker rounded-xl h-10 px-4 outline-none focus:ring-2 focus:ring-orange-200"
                            required
                            type="text"
                            name="origin"
                            value={formData.origin}
                            onChange={handleInputChange}
                        />
                        <p className="text-red text-xs hidden">Please fill out this field.</p>
                        </div>
                        <div className="mb-3 space-y-2 w-full text-sm">
                        <label className="font-semibold text-[#ffb53d] py-2">
                            Source of Chef*
                        </label>
                        <input
                            placeholder="Source"
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker rounded-xl h-10 px-4 outline-none focus:ring-2 focus:ring-orange-200"
                            required
                            type="text"
                            name="source"
                            value={formData.source}
                            onChange={handleInputChange}
                        />
                        <p className="text-red text-xs hidden">Please fill out this field.</p>
                        </div>
                    </div>
                    <div className="mt-5 text-right gap-3 flex flex-row-reverse max-md:justify-center ">
                        <button
                        className="mb-2 md:mb-0 bg-transparent border-2 border-[#ffb53d] px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-[#ffb53d] hover:text-white rounded-full hover:shadow-lg hover:bg-[#b37f2b]"
                        onClick={handleNext}
                        >
                        Next
                        </button>
                        <button
                        className="mb-2 md:mb-0 bg-red-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-none text-white rounded-full hover:shadow-lg hover:bg-red-500"
                        >
                        Reset
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        </>
    );
};

export default FrontForm;
