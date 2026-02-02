
/*
    Challenge 1.
    Write a SQL query that counts the number of films in each category in the Pagila database.
    - The query should return two columns: category and film_count
    - category should display the name of each category
    - film_count should show the total number of films in that category
    - Results should be grouped by category name
 */

-- your query here
SELECT 
	c."name" AS category, 
	count(fc.film_id) AS film_count 
FROM film_category fc
INNER JOIN category c 
ON fc.category_id = c.category_id 
GROUP BY c."name"

 /*
    Challenge 2.
    Write a SQL query that finds the top 5 customers who have spent the most money in the Pagila database.
    - The query should return three columns: first_name, last_name, and total_spent
    - total_spent should show the sum of all payments made by that customer
    - Results should be ordered by total_spent in descending order
    - The query should limit results to only the top 5 highest-spending customers
 */

 -- your query here

-- CTE
WITH sum_amount AS (
SELECT 
	p.customer_id, 
	sum(p.amount) AS sum_amount_per_client
FROM payment p 
GROUP BY p.customer_id 
)
SELECT 
	c.first_name, 
	c.last_name, 
	sa.sum_amount_per_client AS total_spent 
FROM customer c 
INNER JOIN sum_amount sa
ON sa.customer_id = c.customer_id
ORDER BY sa.sum_amount_per_client DESC
FETCH FIRST 5 ROW ONLY;


/*
    Challenge 3.
    Write a SQL query that lists all film titles that have been rented in the past 10 years in the Pagila database.
    - The query should return one column: title
    - title should display the name of each film that has been rented
    - The time period for "recent" should be within the last 10 years from the current date
    - Results should only include films that have rental records in this time period
*/


-- your query here

SELECT 
	f.title 	
FROM rental r 
INNER JOIN inventory i 
ON r.inventory_id = i.inventory_id
INNER JOIN film f 
ON i.film_id  = f.film_id 
WHERE r.rental_date > NOW() - INTERVAL '10 years'

/*
    Challenge 4.
    Write a SQL query that lists all films that have never been rented in the Pagila database.
    - The query should return two columns: title and inventory_id
    - title should display the name of each film that has never been rented
    - inventory_id should show the inventory ID of the specific copy
*/


-- your query here

SELECT f.title, i.inventory_id  FROM inventory i 
LEFT JOIN rental r 
ON r.inventory_id =  i.inventory_id 
INNER JOIN film f
ON i.film_id = f.film_id
WHERE r.rental_id IS NULL


/*
    Challenge 5.
    Write a SQL query that lists all films that were rented more times than the average rental count per film in the Pagila database.
    - The query should return two columns: title and rental_count
    - title should display the name of each film
    - rental_count should show the total number of times the film was rented
*/

-- your query here

WITH count_rented_movies AS(
	SELECT 
		f.title,
		COUNT(rental_id) AS rental_count
	FROM film f
	INNER JOIN inventory i 
	ON i.film_id = f.film_id
	INNER JOIN rental r
	ON r.inventory_id = i.inventory_id 
	GROUP BY f.film_id
)
SELECT 
	title,
	rental_count
FROM count_rented_movies
WHERE rental_count > (SELECT AVG(rental_count) FROM count_rented_movies)
ORDER BY rental_count DESC

/*
    Challenge 6.
    Write a SQL query that calculates rental activity for each customer.
    - The query should return the customer's first_name and last_name
    - It should also return their first rental date as first_rental
    - Their most recent rental date should be shown as last_rental
    - The difference in days between the first and last rentals should be shown as rental_span_days
    - Results should be grouped by customer and ordered by rental_span_days in descending order
*/

-- your query here

WITH customer_rental_activity AS(
SELECT 
	c.first_name, 
	c.last_name, 
	MIN(r.rental_date) AS first_rental, 
	MAX(r.rental_date) AS last_rental
FROM customer c 
INNER JOIN rental r
ON r.customer_id = c.customer_id
GROUP BY c.customer_id
)
SELECT 
	first_name, 
	last_name, 
	first_rental, 
	last_rental, 
	(last_rental - first_rental) AS rental_span_days 
FROM customer_rental_activity 
ORDER BY rental_span_days DESC

/*
    Challenge 7.
    Find all customers who have not rented movies from every available genre.
    - The result should include the customer's first_name and last_name
    - Only include customers who are missing at least one genre in their rental history
*/


-- your query here

WITH genres AS(
SELECT 
	(count(category.category_id) - 1) AS almost_all_genres
FROM category 
)
SELECT
	c.first_name,
	c.last_name,
	COUNT(DISTINCT fc.category_id) AS rented_genres
FROM customer c 
INNER JOIN rental r
ON c.customer_id = r.customer_id
INNER JOIN inventory i
ON r.inventory_id = i.inventory_id 
INNER JOIN film_category fc 
ON i.film_id = fc.film_id 
GROUP BY c.customer_id
HAVING COUNT(DISTINCT fc.category_id)  <= (SELECT almost_all_genres FROM genres)

/*
    Challenge 8.
    Create a materialized view that summarizes total rental revenue per film category.

    First, write a SQL query that returns the category name and the total revenue generated by rentals in that category.

    Use the following tables: payment, rental, inventory, film, film_category, and category.

    - Group the results by category name and order them by total revenue (descending).
    - Then, turn your query into a materialized view named revenue_by_category.
    - Query the materialized view to return:
    - All categories and their total revenue.
    - The top 3 categories by revenue.
    - Finally, refresh the materialized view manually using SQL.

    Once you finish the exercise, please answer the following questions: 
    
    When would you prefer a materialized view over a regular view? 
    How often should it be refreshed?
*/

-- your work here

CREATE MATERIALIZED VIEW revenue_by_category AS 
SELECT 
	c."name" AS category_name,
	SUM(p.amount) AS revenue_by_category
FROM payment p
INNER JOIN rental r 
ON p.rental_id = r.rental_id 
INNER JOIN inventory i
ON r.inventory_id = i.inventory_id
INNER JOIN film_category fc 
ON i.film_id = fc.film_id 
INNER JOIN category c 
ON fc.category_id = c.category_id
GROUP BY c."name"
ORDER BY revenue_by_category DESC

REFRESH MATERIALIZED VIEW revenue_by_category
SELECT * FROM revenue_by_category FETCH FIRST 3 ROW ONLY

/* 

    1. When would you prefer a materialized view over a regular view?
    // I'd prefer using materialized view when we need to consult data that does not change frequently, also it is good to performance because it's not
    changing so often.
     
    2. How often should it be refreshed?
	// I think for this specefic scenario and because this MV is giving report data, it will set it to refresh every friday at the end of the work day,
	it is data that won't be having significant changes. 
	
	
*/


