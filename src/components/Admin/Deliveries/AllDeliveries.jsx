import React from 'react';


const AllDeliveries = () => {
    const [selectedStatus, setSelectedStatus] = React.useState(null);

    const status_colors = [
        { name: "All", color: "primary_color" },
        { name: "Cancelled", color: "primary_red" },
        { name: "Delivery on Router", color: "secondary_color" },
        { name: "Pending", color: "primary_color" },
        { name: "onHold", color: "rgba(255,255,255,0.5)" },
        { name: "Completed", color: "primary_green" }
    ];

    // Update getStatusColor to use the new structure
    const getStatusColor = (status) => {
        const statusItem = status_colors.find(item => item.name === status);
        return statusItem ? `text-${statusItem.color}` : '';
    };

    const deliveryOrders = {
        orders: [
            {
                order_id: "ORD123456",
                order_date: new Date("2023-10-01"),
                order_status: "Pending",
                delivery_cost: 15.99,
                delivery_status: "Delivery on Router",
                cart_items: [
                    {
                        product: {
                            productName: "Wireless Headphones",
                            quantity: 2,
                            id: "PROD001",
                            description: "Noise-cancelling wireless headphones"
                        },
                        vendor_address: {
                            street: "123 Tech Lane",
                            city: "San Francisco",
                            state: "CA",
                            zip: "94107"
                        }
                    }
                ],
                delivery_address: {
                    street: "456 Elm St",
                    city: "San Francisco",
                    state: "CA",
                    zip: "94110"
                },
                estimated_delivery_date: new Date("2023-10-05"),
                delivery_company: "Iska Delivery"
            },
            {
                order_id: "ORD123457",
                order_date: new Date("2023-10-02"),
                order_status: "Completed",
                delivery_cost: 25.50,
                delivery_status: "Completed",
                cart_items: [
                    {
                        product: {
                            productName: "Smart Watch",
                            quantity: 1,
                            id: "PROD002",
                            description: "Fitness tracking smart watch"
                        },
                        vendor_address: {
                            street: "789 Gadget Ave",
                            city: "New York",
                            state: "NY",
                            zip: "10001"
                        }
                    }
                ],
                delivery_address: {
                    street: "321 Oak St",
                    city: "New York",
                    state: "NY",
                    zip: "10002"
                },
                estimated_delivery_date: new Date("2023-10-07"),
                delivery_company: "Iska Delivery"
            },
            {
                order_id: "ORD123458",
                order_date: new Date("2023-10-03"),
                order_status: "onHold",
                delivery_cost: 10.00,
                delivery_status: "onHold",
                cart_items: [
                    {
                        product: {
                            productName: "Bluetooth Speaker",
                            quantity: 1,
                            id: "PROD003",
                            description: "Portable Bluetooth speaker"
                        },
                        vendor_address: {
                            street: "456 Sound Blvd",
                            city: "Los Angeles",
                            state: "CA",
                            zip: "90001"
                        }
                    }
                ],
                delivery_address: {
                    street: "789 Pine St",
                    city: "Los Angeles",
                    state: "CA",
                    zip: "90002"
                },
                estimated_delivery_date: new Date("2023-10-08"),
                delivery_company: "Iska Delivery"
            },
            {
                order_id: "ORD123459",
                order_date: new Date("2023-10-04"),
                order_status: "Cancelled",
                delivery_cost: 30.00,
                delivery_status: "Cancelled",
                cart_items: [
                    {
                        product: {
                            productName: "Laptop Backpack",
                            quantity: 1,
                            id: "PROD004",
                            description: "Water-resistant laptop backpack"
                        },
                        vendor_address: {
                            street: "321 Gear Rd",
                            city: "Chicago",
                            state: "IL",
                            zip: "60601"
                        }
                    }
                ],
                delivery_address: {
                    street: "654 Birch St",
                    city: "Chicago",
                    state: "IL",
                    zip: "60602"
                },
                estimated_delivery_date: new Date("2023-10-09"),
                delivery_company: "Iska Delivery"
            },
            {
                order_id: "ORD123460",
                order_date: new Date("2023-10-05"),
                order_status: "Completed",
                delivery_cost: 20.00,
                delivery_status: "Completed",
                cart_items: [
                    {
                        product: {
                            productName: "Wireless Mouse",
                            quantity: 3,
                            id: "PROD005",
                            description: "Ergonomic wireless mouse"
                        },
                        vendor_address: {
                            street: "987 Tech Dr",
                            city: "Seattle",
                            state: "WA",
                            zip: "98101"
                        }
                    }
                ],
                delivery_address: {
                    street: "123 Cedar St",
                    city: "Seattle",
                    state: "WA",
                    zip: "98102"
                },
                estimated_delivery_date: new Date("2023-10-10"),
                delivery_company: "Iska Delivery"
            },
            {
                order_id: "ORD123461",
                order_date: new Date("2023-10-06"),
                order_status: "Pending",
                delivery_cost: 12.99,
                delivery_status: "Pending",
                cart_items: [
                    {
                        product: {
                            productName: "USB-C Hub",
                            quantity: 1,
                            id: "PROD006",
                            description: "Multi-port USB-C hub"
                        },
                        vendor_address: {
                            street: "654 Accessory Ln",
                            city: "Austin",
                            state: "TX",
                            zip: "73301"
                        }
                    }
                ],
                delivery_address: {
                    street: "987 Maple St",
                    city: "Austin",
                    state: "TX",
                    zip: "73302"
                },
                estimated_delivery_date: new Date("2023-10-11"),
                delivery_company: "Iska Delivery"
            },
            {
                order_id: "ORD123462",
                order_date: new Date("2023-10-07"),
                order_status: "onHold",
                delivery_cost: 18.75,
                delivery_status: "onHold",
                cart_items: [
                    {
                        product: {
                            productName: "External Hard Drive",
                            quantity: 1,
                            id: "PROD007",
                            description: "1TB portable external hard drive"
                        },
                        vendor_address: {
                            street: "321 Storage Rd",
                            city: "Miami",
                            state: "FL",
                            zip: "33101"
                        }
                    }
                ],
                delivery_address: {
                    street: "654 Palm St",
                    city: "Miami",
                    state: "FL",
                    zip: "33102"
                },
                estimated_delivery_date: new Date("2023-10-12"),
                delivery_company: "Iska Delivery"
            }
        ]
    };
    
    // Update filter logic to handle "All" status
    const filteredOrders = selectedStatus && selectedStatus !== "All"
        ? deliveryOrders.orders.filter(order => order.delivery_status === selectedStatus)
        : deliveryOrders.orders;

    // Handle status click
    const handleStatusClick = (statusName) => {
        setSelectedStatus(statusName === selectedStatus ? null : statusName);
    };

    return (
        <div>
            <div className='py-[2em] flex flex-col justify-between gap-[2em] items-start'>
                <div>
                    <h4>All</h4>
                    <h2 className='font-bold'>Deliveries</h2>
                </div>
                <div className='flex md:gap-[2em] gap-[1em]  items-center flex-wrap'>
                    {status_colors.map((status, index) => (
                        <div 
                            key={index} 
                            className='flex  md:gap-[1em] gap-[0.5em] items-center cursor-pointer' 
                            onClick={() => handleStatusClick(status.name)}
                        >
                            <div className={`w-[1em] h-[1em] rounded-full bg-${status.color}`}></div>
                            <p className={`text-${status.color} ${selectedStatus === status.name ? 'font-bold' : ''}`}>
                                {status.name}
                            </p>
                        </div>
                    ))}
                </div>

                <h5> <strong>Total:  </strong> {filteredOrders.length}</h5>

                <div className='flex flex-col gap-[2em] items-center'>
                    {filteredOrders.map((order, index) => (
                        <div key={index} className='border grid md:grid-cols-3 grid-cols-2 gap-[1em] border-primary_color card p-[3em]'>
                            <p><strong>Order ID:</strong>  <br/> {order.order_id}</p>
                            <p>Order Date: <br/> {order.order_date.toDateString()}</p>
                            <p>Order Status: <br/> <span className={getStatusColor(order.order_status)}>{order.order_status}</span></p>
                            <p><strong>Delivery Cost: <br/> </strong> ${order.delivery_cost.toFixed(2)}</p>
                            <p><strong>Delivery Status: <br/> </strong> <span className={getStatusColor(order.delivery_status)}>{order.delivery_status}</span></p>
                            <p><strong>Delivery Address: <br/>  </strong> {JSON.stringify(order.delivery_address)}</p>
                            <p><strong>Estimated Delivery Date: <br/> </strong> {order.estimated_delivery_date.toDateString()}</p>
                            <p><strong>Delivery Company: <br/> </strong> {order.delivery_company}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllDeliveries;