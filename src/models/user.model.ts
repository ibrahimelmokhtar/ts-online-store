import User from '../types/user.type';
import pool from '../database';
import { PoolClient } from 'pg';

class UserModel {
	/**
	 * @description Create new User within the database.
	 * @param {User} user
	 * @returns {User} Created User object.
	 */
	create = async (user: User): Promise<User | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string =
				'INSERT INTO users (first_name, last_name, user_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *';
			const result = await client.query(sql, [
				user.firstName,
				user.lastName,
				user.userName,
				user.email,
				user.password,
			]);

			// release connection:
			client.release();

			// return created user:
			return result.rows[0];
		} catch (error) {
			if (process.env.NODE_ENV !== 'test') {
				console.error(
					`Unable to create ${user.userName}: ${
						(error as Error).message
					}`
				);
			}
		}
	};

	/**
	 * @description Show a specific User from the database.
	 * @param {number} userID
	 * @returns {User} Desired User object.
	 */
	show = async (userID: number): Promise<User | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string = 'SELECT * FROM users WHERE id=($1)';
			const result = await client.query(sql, [userID]);

			// release connection:
			client.release();

			// return a specific user:
			return result.rows[0];
		} catch (error) {
			if (process.env.NODE_ENV !== 'test') {
				console.error(
					`Unable to show ${userID}: ${(error as Error).message}`
				);
			}
		}
	};

	/**
	 * @description Show all User objects from the database.
	 * @returns {User[]} Array of User objects.
	 */
	showAllUsers = async (): Promise<User[] | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string = 'SELECT * FROM users';
			const result = await client.query(sql);

			// release connection:
			client.release();

			// return all users:
			return result.rows;
		} catch (error) {
			if (process.env.NODE_ENV !== 'test') {
				console.error(
					`Unable to show users: ${(error as Error).message}`
				);
			}
		}
	};

	/**
	 * @description Update a specific User object.
	 * @param {number} userID
	 * @param {User} user
	 * @returns {User} Updated User object.
	 */
	update = async (userID: number, user: User): Promise<User | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string =
				'UPDATE users SET first_name=($2), last_name=($3), user_name=($4), email=($5), password=($6) WHERE id=($1) RETURNING *';
			const result = await client.query(sql, [
				userID,
				user.firstName,
				user.lastName,
				user.userName,
				user.email,
				user.password,
			]);

			// release connection:
			client.release();

			// return updated user:
			return result.rows[0];
		} catch (error) {
			if (process.env.NODE_ENV !== 'test') {
				console.error(
					`Unable to update ${userID}: ${(error as Error).message}`
				);
			}
		}
	};

	/**
	 * @description Delete a specific User object.
	 * @param {number} userID
	 * @returns {User} Deleted User object.
	 */
	delete = async (userID: number): Promise<User | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string = 'DELETE FROM users WHERE id=($1) RETURNING *';
			const result = await client.query(sql, [userID]);

			// release connection:
			client.release();

			// return deleted user:
			return result.rows[0];
		} catch (error) {
			if (process.env.NODE_ENV !== 'test') {
				console.error(
					`Unable to delete ${userID}: ${(error as Error).message}`
				);
			}
		}
	};
}

export default UserModel;