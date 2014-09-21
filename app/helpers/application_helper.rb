module ApplicationHelper

  def current_namespace?( name )
    namespace_name = controller.class.name.downcase.split("::")
    return false if namespace_name.length == 1
    ( ( name.is_a? Array ) ? name.include?( namespace_name[0] ) : ( name == namespace_name[0] ) )
  end
  
  def current_controller?( name )
    controller_name   = controller.class.name.downcase.gsub(/controller/, "").split("::").last
    ( ( name.is_a? Array ) ? name.include?( controller_name ) : ( name == controller_name ))
  end
  
  def current_action?( name )
    ( ( name.is_a? Array ) ? name.include?( controller.action_name.downcase ) : ( name == controller.action_name ) )
  end
end
