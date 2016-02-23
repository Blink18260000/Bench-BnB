class Api::BenchesController < ApplicationController
  def create
    new_bench = {};
    new_bench["description"] = bench_params["description"]
    new_bench["lat"] = Float(bench_params["lat"])
    new_bench["long"] = Float(bench_params["long"])
    new_bench["seating"] = Integer(bench_params["seating"])
    @bench = Bench.new(new_bench)

    if @bench.save
      render :show
    else
      render json: @bench.errors.full_messages, status: 422
    end
  end

  def index
    if (params[:bounds])
      @benches = Bench.in_bounds(params[:bounds])
    else
      @benches = Bench.all
    end
  end

  def show
    @bench = Bench.find(params[:id])
  end

  private
  def bench_params
    params.require(:bench).permit(
      :description, :lat, :long, :seating
    )
  end
end
