/*
    Challenge: Implement a Secure Fund Transfer Function

    In this challenge, you will implement a PostgreSQL stored function to simulate transferring funds 
    between two accounts in a banking system. The function must follow proper validation, ensure data 
    integrity, and log transactions with a shared reference.

    Your function should be named:
    banking.transfer_funds(from_id INT, to_id INT, amount NUMERIC)

    The function must:

    - Prevent transfers to the same account
    - Ensure the transfer amount is greater than zero
    - Validate that both sender and recipient accounts exist
    - Prevent transfers if either account is marked as "frozen"
    - Ensure the sender has sufficient funds
    - Debit the sender and credit the recipient atomically
    - Log two transactions: a withdrawal and a deposit, both linked by the same UUID reference
    - Raise meaningful exceptions for all validation failures

    The function should perform all operations within a safe transactional context, maintaining 
    database consistency even in the event of failure.

    Notes:
    - In order to test you can mock some additional data in the tables that participates in this challenge.
    - Make sure of raising errors when they're present

    ERD:
    +---------------------+            +--------------------------+
    |     accounts        |            |      transactions        |
    +---------------------+            +--------------------------+
    | account_id (PK)     |<-----------| transaction_id (PK)      |
    | balance             |            | account_id (FK)          |
    | status              |            | amount                   |
    +---------------------+            | transaction_type         |
                                       | reference                |
                                       | transaction_date         |
                                       +--------------------------+
*/
-- your solution here

CREATE OR REPLACE FUNCTION banking.transfer_funds(from_id INT, to_id INT, amount NUMERIC)
RETURNS void as $body$
DECLARE
	ref_uuid UUID := gen_random_uuid(); -- GENERATING UUID
	active_accounts INT;
	sender_funds NUMERIC;
	status_account INT;
BEGIN
-- VALIDATIONS WHERE CONSULTING DB IS NOT NEEDED
	IF from_id = to_id THEN
		raise exception 'Performing a transfer to the same account is not allowed!';
	END IF;
	IF amount <= 0 THEN
		raise exception 'Performing a transfer with negative/zero amount is not allowed!';
	END IF;
-- PERFORMING ATOMIC BLOCK (NO DEADLOCKS OR EXTERNAL CHANGES)
perform * FROM accounts
WHERE account_id in (from_id, to_id)
ORDER BY account_id
FOR UPDATE;
-- VALIDATING THE EXISTENCE OF BOTH ACCOUNTS AND ALSO THEIR STATUS  
SELECT 
	count(*) INTO active_accounts
FROM accounts 
WHERE account_id 
IN (from_id, to_id);

SELECT 
	count(*) INTO status_account
FROM accounts 
WHERE account_id 
IN (from_id, to_id)
AND status != 'frozen';

IF active_accounts = 2 THEN 
	IF status_account = 2 THEN 
		SELECT balance INTO sender_funds from accounts WHERE account_id = from_id;
		IF sender_funds >= amount THEN
			-- TRANSFERENCE EXECUTION
			UPDATE accounts SET balance = balance - amount WHERE account_id = from_id;
			UPDATE accounts SET balance = balance + amount WHERE account_id = to_id;
			-- INSERTING LOGS INTO TRANSACTIONS TABLE LINKED BY UUID
			INSERT INTO transactions (account_id, amount, transaction_type, reference, transaction_date)
			VALUES (from_id, amount, 'withdrawal', ref_uuid, current_timestamp);
	
			INSERT INTO transactions (account_id, amount, transaction_type, reference, transaction_date)
			VALUES (to_id, amount, 'deposit', ref_uuid, current_timestamp);
	
			RAISE NOTICE 'Successful transfer. Reference: %', ref_uuid;
		ELSE
			RAISE EXCEPTION 'Insufficient funds. Available: %, Needed: %', sender_funds, amount;
		END IF;
	ELSE 
		RAISE EXCEPTION 'Account status failed - From: (ID) % and/or To: (ID) % accounts have a frozen status', from_id, to_id;
	END IF;
ELSE
	RAISE EXCEPTION 'Account validation failed - From: (ID) % and/or To: (ID) % accounts not found in database.', from_id, to_id;
END IF;

END $body$
language plpgsql;

SELECT transfer_funds(2, 1, 600)