import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const RevenueChart = ({ orders }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!orders || orders.length === 0) return;

    // Process the order data to get revenue by date
    const revenueByDate = orders.reduce((acc, order) => {
      const date = new Date(order.paidAt).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += order.totalPrice;
      return acc;
    }, {});

    // Sort dates chronologically
    const sortedDates = Object.keys(revenueByDate).sort((a, b) => 
      new Date(a) - new Date(b)
    );

    const labels = sortedDates;
    const data = sortedDates.map(date => revenueByDate[date]);

    // Calculate total revenue
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

    // Get top selling products
    const productSales = {};
    orders.forEach(order => {
      order.cart.forEach(item => {
        if (!productSales[item.name]) {
          productSales[item.name] = {
            quantity: 0,
            revenue: 0
          };
        }
        productSales[item.name].quantity += item.qty || 1;
        productSales[item.name].revenue += (item.discountPrice || 0) * (item.qty || 1);
      });
    });

    const topProducts = Object.entries(productSales)
      .sort((a, b) => b[1].revenue - a[1].revenue)
      .slice(0, 5);

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Daily Revenue',
          data: data,
          backgroundColor: 'rgba(23, 99, 124, 0.7)',
          borderColor: '#17637C',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#17637C',
              font: {
                family: 'Poppins'
              }
            }
          },
          title: {
            display: true,
            text: 'Revenue by Date',
            color: '#17637C',
            font: {
              family: 'Poppins'
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `GH₵${context.raw.toFixed(2)}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#17637C',
              font: {
                family: 'Poppins'
              },
              callback: function(value) {
                return `GH₵${value}`;
              }
            },
            grid: {
              color: 'rgba(23, 99, 124, 0.1)'
            }
          },
          x: {
            ticks: {
              color: '#17637C',
              font: {
                family: 'Poppins'
              }
            },
            grid: {
              color: 'rgba(23, 99, 124, 0.1)'
            }
          }
        }
      }
    });

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [orders]);

  if (!orders || orders.length === 0) {
    return <div className="text-center py-8">No order data available</div>;
  }

  // Calculate summary statistics
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const averageOrderValue = totalRevenue / orders.length;
  const orderCount = orders.length;

  // Get top selling products
  const productSales = {};
  orders.forEach(order => {
    order.cart.forEach(item => {
      if (!productSales[item.name]) {
        productSales[item.name] = {
          quantity: 0,
          revenue: 0
        };
      }
      productSales[item.name].quantity += item.qty || 1;
      productSales[item.name].revenue += (item.discountPrice || 0) * (item.qty || 1);
    });
  });

  const topProducts = Object.entries(productSales)
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .slice(0, 5);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6 font-Poppins text-[#17637C]">Revenue Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#17637C]/10 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-[#17637C]">Total Revenue</h3>
          <p className="text-2xl font-bold text-[#17637C]">GH₵{totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-[#17637C]/10 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-[#17637C]">Total Orders</h3>
          <p className="text-2xl font-bold text-[#17637C]">{orderCount}</p>
        </div>
        <div className="bg-[#17637C]/10 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-[#17637C]">Avg. Order Value</h3>
          <p className="text-2xl font-bold text-[#17637C]">GH₵{averageOrderValue.toFixed(2)}</p>
        </div>
      </div>

      <div className="mb-8 h-[600px]">
        <canvas ref={chartRef}></canvas>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-primary_color p-[2em] rounded-lg">
          <h3 className="font-bold mb-4 text-text_color font-Poppins">Top Selling Products</h3>
          <div className="space-y-3">
            {topProducts.map(([name, stats], index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium text-text_color">{name}</span>
                <div className="text-right">
                  <p className="text-sm text-text_color">GH₵{stats.revenue.toFixed(2)} revenue</p>
                  <p className="text-xs text-text_color/70">{stats.quantity} sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary_color p-[2em] rounded-lg">
          <h3 className="font-bold mb-4 text-text_color font-Poppins">Order Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-text_color">Completed Orders</span>
              <p className="font-bold text-text_color">
                {orders.filter(order => order.status === "Delivered").length}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text_color">Pending Orders</span>
              <p className="font-bold text-text_color">
                {orders.filter(order => order.status === "Processing").length}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text_color">Cancelled Orders</span>
              <p className="font-bold text-text_color">
                {orders.filter(order => order.status === "Cancelled").length}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text_color">Average Processing Time</span>
              <p className="font-bold text-text_color">2.5 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;