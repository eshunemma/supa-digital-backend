#!/bin/bash
APPLICATION_HEALTH=$(curl -X POST -H "Content-Type: application/json" -d '{"query": "query {payrollHealthCheck}"}' "${payroll_backend_staging_url}" | jq -r '.data.payrollHealthCheck')
DATABASE_HEALTH=$(curl -X POST -H "Content-Type: application/json" -d '{"query": "query {payrollDBCheck}"}' "${payroll_backend_staging_url}" | jq -r '.data.payrollDBCheck')

if [[ "$APPLICATION_HEALTH" == "OK" && "$DATABASE_HEALTH" == "OK" ]]; then
    echo "Health checks passed:"
    echo "Application Health: $APPLICATION_HEALTH"
    echo "Database Health: $DATABASE_HEALTH"
else
    echo "Health checks failed:"
    echo "Application Health: $APPLICATION_HEALTH"
    echo "Database Health: $DATABASE_HEALTH"
    exit 1
fi