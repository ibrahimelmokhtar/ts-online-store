import { DEFAULT_ORDER_PRODUCT } from '../constants/orderProduct.type.constant';
import { PoolClient } from 'pg';
import pool from '../database';
import OrderProduct from '../types/orderProduct.type';

class OrderProductModel {
	/**
	 * @description Check specific order's status.
	 * @param {string} orderID
	 * @returns {boolean} Order's status.
	 */
	checkOrderStatus = async (orderID: string): Promise<boolean | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string = 'SELECT * FROM orders WHERE id=($1)';
			const result = await client.query(sql, [orderID]);

			// release connection:
			client.release();

			// return a specific order's status:
			return result.rows[0]['is_done'];
		} catch (error) {
			console.error(
				`Cart Model: Unable to check ${orderID} status: ${
					(error as Error).message
				}`
			);
		}
	};

	/**
	 * @description Add new product into order_products table.
	 * @param {string} orderID
	 * @param {string} productID
	 * @param {number} quantity
	 * @returns {Cart} Added Cart object.
	 */
	addProduct = async (
		orderID: string,
		quantity: number,
		productID: string
	): Promise<OrderProduct | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			let sql: string = 'EMPTY SQL QUERY';
			let sentValues: Array<string | number> = [];
			if (process.env.NODE_ENV === 'test') {
				sql =
					'INSERT INTO order_products (id, order_id, product_id, quantity) VALUES ($1, $2, $3, $4) RETURNING *';
				sentValues = [
					DEFAULT_ORDER_PRODUCT.id as string,
					orderID,
					productID,
					quantity,
				];
			} else {
				sql =
					'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
				sentValues = [orderID, productID, quantity];
			}

			// check order's status to be (false)--->(active):
			if (await this.checkOrderStatus(orderID)) {
				console.log(
					`Cart Model: Unable to add product into ${orderID}: Order status is ${await this.checkOrderStatus(
						orderID
					)}`
				);
				return;
			}

			// run desired query:
			const result = await client.query(sql, sentValues);

			// release connection:
			client.release();

			// return a specific cart:
			return result.rows[0];
		} catch (error) {
			console.error(
				`Cart Model: Unable to add product ${productID} into ${orderID}: ${
					(error as Error).message
				}`
			);
		}
	};

	/**
	 * @description Show a specific OrderProduct from the database.
	 * @param {string} orderID
	 * @param {string} productID
	 * @returns {OrderProduct} Desired OrderProduct object.
	 */
	showProduct = async (
		orderID: string,
		productID: string
	): Promise<OrderProduct | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			const sql =
				'SELECT * FROM order_products WHERE order_id=($1) AND product_id=($2)';

			// run desired query:
			const result = await client.query(sql, [orderID, productID]);

			// release connection:
			client.release();

			// return a specific cart:
			return result.rows[0];
		} catch (error) {
			console.error(
				`Cart Model: Unable to show product ${productID} within ${orderID}: ${
					(error as Error).message
				}`
			);
		}
	};

	/**
	 * @description Show all OrderProduct objects from the database.
	 * @param {string} orderID
	 * @returns {Array<OrderProduct>} Array of OrderProduct objects.
	 */
	showAllProducts = async (
		orderID: string
	): Promise<Array<OrderProduct> | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			const sql = 'SELECT * FROM order_products WHERE order_id=($1)';

			// run desired query:
			const result = await client.query(sql, [orderID]);

			// release connection:
			client.release();

			// return a specific cart:
			return result.rows;
		} catch (error) {
			console.error(
				`Cart Model: Unable to show products within ${orderID}: ${
					(error as Error).message
				}`
			);
		}
	};

	/**
	 * @description Update a specific OrderProduct object.
	 * @param {string} orderID
	 * @param {string} productID
	 * @param {number} quantity
	 * @returns {OrderProduct} Updated OrderProduct object.
	 */
	updateProductQuantity = async (
		orderID: string,
		productID: string,
		quantity: number
	): Promise<OrderProduct | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			const sql =
				'UPDATE order_products SET quantity=($3) WHERE order_id=($1) AND product_id=($2) RETURNING *';

			// check order's status to be (false)--->(active):
			if (await this.checkOrderStatus(orderID)) {
				console.log(
					`Cart Model: Unable to add product into ${orderID}: Order status is ${await this.checkOrderStatus(
						orderID
					)}`
				);
				return;
			}
			// run desired query:
			const result = await client.query(sql, [
				orderID,
				productID,
				quantity,
			]);

			// release connection:
			client.release();

			// return a specific cart:
			return result.rows[0];
		} catch (error) {
			console.error(
				`Cart Model: Unable to update product ${productID} within ${orderID}: ${
					(error as Error).message
				}`
			);
		}
	};

	/**
	 * @description Delete a specific OrderProduct object.
	 * @param {string} orderID
	 * @param {string} productID
	 * @returns {OrderProduct} Deleted OrderProduct object.
	 */
	deleteProduct = async (
		orderID: string,
		productID: string
	): Promise<OrderProduct | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			const sql =
				'DELETE FROM order_products WHERE order_id=($1) AND product_id=($2) RETURNING *';
			// check order's status to be (false)--->(active):
			if (await this.checkOrderStatus(orderID)) {
				console.log(
					`Cart Model: Unable to add product into ${orderID}: Order status is ${await this.checkOrderStatus(
						orderID
					)}`
				);
				return;
			}

			// run desired query:
			const result = await client.query(sql, [orderID, productID]);

			// release connection:
			client.release();

			// return a specific cart:
			return result.rows[0];
		} catch (error) {
			console.error(
				`Cart Model: Unable to delete product ${productID} from ${orderID}: ${
					(error as Error).message
				}`
			);
		}
	};
}

export default OrderProductModel;