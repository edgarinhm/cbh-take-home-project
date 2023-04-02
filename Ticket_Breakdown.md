# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
## T1 MODIFY AGENTS TABLE
As a user, I want to Add custom_id column to Agents table with the type of string and a constrain unique key
AC: make consults to Agents table by the custom_id column
AC: save Agents with custom_id value
AC: do not save custom_id with value repeated
Points: 1

## T2 ADD FUNCTION getShiftsByCustomAgentIdAndFacility
As a user, I want to create a sql consult to return all shifts filtered by custom id and facility 
AC: call the new function getShiftsByCustomAgentIdAndFacility to return all shifts for the agent custom id provided and facility
Point: 2

## T3 ADD custom id attribute to Agents form UI
As a user, I want to be able to write and save custom id attribute from platform
AC: modify and existing agent with empty value to fill custom id attribute and save to api backend
AC: add new agents with custom id attribute
AC: use an existing custom id will be rejected after submit
Points: 3

## T4 BULK LOAD CUSTOM ID to existing agents
As a user; I want to load bulk fo customs id for existing Agents using a data integration tool
AC: run a task o procedure to load custom id for agents from a file with custom extension excel, cvs, text
Point: 2