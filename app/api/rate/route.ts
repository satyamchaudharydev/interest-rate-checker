
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export  async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const price = searchParams.get('price');
  const loan_amount = searchParams.get('loan_amount');
  const minfico = searchParams.get('minfico');
  const maxfico = searchParams.get('maxfico');
  const state = searchParams.get('state');
  const rate_structure = searchParams.get('rate_structure');
  const loan_term = searchParams.get('loan_term');
  const loan_type = searchParams.get('loan_type');
  const arm_type = searchParams.get('arm_type');
  

  const url = `https://www.consumerfinance.gov/oah-api/rates/rate-checker?price=${price}&loan_amount=${loan_amount}&minfico=${minfico}&maxfico=${maxfico}&state=${state}&rate_structure=${rate_structure}&loan_term=${loan_term}&loan_type=${loan_type}&arm_type=${arm_type}`;
  console.log(url);
  const response = await axios.get(url);
  console.log(response.data, "response");
  return NextResponse.json(response.data);
} 