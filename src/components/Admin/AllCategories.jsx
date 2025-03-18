import React, { useState } from 'react';

const sampleCategories = [
  {
    id: 1,
    title: "Computers and Laptops",
    subTitle: "",
    description: "Shop the latest computers and laptops featuring cutting-edge technology, from powerful workstations to ultraportable notebooks.",
    image_Url: "https://cdn.shopify.com/s/files/1/1706/9177/products/NEWAppleMacbookProwithM1ProChip14InchLaptop2021ModelMKGQ3LL_A_16GB_1TBSSD_custommacbd.jpg?v=1659592838",
  },
  {
    id: 2,
    title: "Cosmetics and Body Care",
    subTitle: "",
    description: "Discover premium beauty products and skincare essentials for your daily self-care routine.",
    image_Url: "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-07/kosme1.png",
  },
  {
    id: 3,
    title: "Accessories",
    subTitle: "",
    description: "Enhance your style with our collection of trendy accessories, from bags to jewelry and more.",
    image_Url: "https://img.freepik.com/free-vector/ordering-goods-online-internet-store-online-shopping-niche-e-commerce-website-mother-buying-babies-clothes-footwear-toys-infant-accessories_335657-2345.jpg?w=2000",
  },
  {
    id: 4,
    title: "Clothes",
    subTitle: "",
    description: "Browse our fashion collection featuring the latest trends in clothing for all occasions.",
    image_Url: "https://www.shift4shop.com/2015/images/industries/clothing/clothing-apparel.png",
  },
  {
    id: 5,
    title: "Shoes",
    subTitle: "",
    description: "Step out in style with our diverse collection of footwear for every occasion and season.",
    image_Url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvBQPQMVNRd6TtDkGs2dCri0Y-rxKkFOiEWw&usqp=CAU",
  }
];

const AllCategories = () => {
  const [categories, setCategories] = useState(sampleCategories);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    id: '',
    title: '',
    description: '',
    image_Url: '',
    subTitle: ''
  });
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleDelete = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setNewCategory(category);
  };

  const handleUpdate = () => {
    setCategories(categories.map(cat => 
      cat.id === editingCategory.id ? newCategory : cat
    ));
    setEditingCategory(null);
    setNewCategory({
      id: '',
      title: '',
      description: '',
      image_Url: '',
      subTitle: ''
    });
  };

  const handleAdd = () => {
    const newId = Math.max(...categories.map(cat => cat.id)) + 1;
    setCategories([...categories, { ...newCategory, id: newId }]);
    setIsAddingNew(false);
    setNewCategory({
      id: '',
      title: '',
      description: '',
      image_Url: '',
      subTitle: ''
    });
  };

  return (
    <div className="p-4">
      <div className="flex flex-col lg:flex-row justify-between gap-2 lg:items-center mb-6">
        <div>
        <h1 className=" font-bold">All Categories</h1>
        <p className='text-sm text-gray-500'>NB:These are dummy static categories for testing. Full scale dynamic multi-dimensional categories is under development.</p>
      
        </div>
      
        <button 
          onClick={() => setIsAddingNew(true)}
          className="bg-primary_color text-text_color px-4 py-2 rounded hover:bg-[#2c1ba7]"
        >
          Add New Category
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAddingNew || editingCategory) && (
        <div className="mb-8 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">
            {isAddingNew ? 'Add New Category' : 'Edit Category'}
          </h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title"
              value={newCategory.title}
              onChange={(e) => setNewCategory({...newCategory, title: e.target.value})}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newCategory.image_Url}
              onChange={(e) => setNewCategory({...newCategory, image_Url: e.target.value})}
              className="p-2 border rounded"
            />
            <textarea
              placeholder="Description"
              value={newCategory.description}
              onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
              className="p-2 border rounded"
              rows="3"
            />
            <div className="flex gap-2">
              <button
                onClick={isAddingNew ? handleAdd : handleUpdate}
                className="bg-[#3321c8] text-white px-4 py-2 rounded hover:bg-[#2c1ba7]"
              >
                {isAddingNew ? 'Add' : 'Update'}
              </button>
              <button
                onClick={() => {
                  setIsAddingNew(false);
                  setEditingCategory(null);
                  setNewCategory({
                    id: '',
                    title: '',
                    description: '',
                    image_Url: '',
                    subTitle: ''
                  });
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories List */}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        {categories.map((category) => (
          <div key={category.id} className="border p-4 rounded-lg">
         

            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <img 
                src={category.image_Url} 
                alt={category.title}
                className="w-32 h-32 object-contain"
              />
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold mb-2">{category.title}</h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </div>

            <div className="flex   gap-2 mt-4">
              <button
                onClick={() => handleEdit(category)}
                className="bg-primary_color text-text_color px-3 py-1 rounded hover:bg-[#2c1ba7]"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="bg-red-500 text-text_color px-3 py-1 rounded bg-primary_red"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategories;
