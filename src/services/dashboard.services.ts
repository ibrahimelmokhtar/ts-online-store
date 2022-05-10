import { PoolClient } from 'pg';
import pool from '../database';
import ProductsInOrder from '../types/dashboard/productsInOrder.type';

class Dashboard {
	showProductsInOrders = async (): Promise<Array<ProductsInOrder> | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string =
				'SELECT order_id, is_done AS is_order_done, name AS product_name, category AS product_category, price AS product_price, quantity AS product_quantity, (price*quantity) AS total_price FROM order_products INNER JOIN orders ON orders.id=order_products.order_id INNER JOIN products ON products.id=order_products.product_id';
			const result = await client.query(sql);

			// release connection:
			client.release();

			// return a specific order:
			return result.rows;
		} catch (error) {
			console.error(
				`Order Model: Unable to show products in orders: ${
					(error as Error).message
				}`
			);
		}
	};
}

export default Dashboard;
