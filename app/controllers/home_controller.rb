class HomeController < ApplicationController

  def index
    @angularController = 'baseController'
  end

  def sample
    @angularController = 'baseController'
  end

  def tables
    @angularController = 'tablesController'
  end

  def warnings
    @angularController = 'warningsController'
  end

  def buttons
    @angularController = 'baseController'
  end

end
