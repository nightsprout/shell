class HomeController < ApplicationController

  def index
    @angularController = 'sampleController'
  end

  def sample
    @angularController = 'sampleController'
  end

  def tables
    @angularController = 'tablesController'
  end

  def warnings
    @angularController = 'warningsController'
  end

end
