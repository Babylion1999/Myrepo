
$(document).ready(function () {
    var ckbAll = $(".cbAll");
    var fmAdmin = $("#zt-form");

    
   


    ClassicEditor
    .create( document.querySelector( '#id_content' ) )
   
    // CKEDITOR
    if ($('textarea#content_ck').length) {
        CKEDITOR.replace('content_ck');
    }

    //call active menu
    activeMenu();

    //check selectbox
    change_form_action("#zt-form .slbAction", "#zt-form","#btn-action");

    //check all
    ckbAll.click(function () {
        $('input:checkbox').not(this).prop('checked', this.checked);
        if ($(this).is(':checked')) {
            $(".ordering").attr("name", "ordering");
        }else{
           
            $(".ordering").removeAttr("name");
        }
        
    });
    // hiden notify
    hiddenNotify(".close-btn");



    $("input[name=cid]").click(function () {
        if ($(this).is(':checked')) {
            $(this).parents("tr").find('.ordering').attr("name", "ordering");
        }else{
            $(this).parents("tr").find('.ordering').removeAttr("name");
        }
    });
    
    // CONFIRM DELETE
    $('a.btn-delete').on('click', () => {
        if (!confirm("Are you sure you want to delete this item?")) return false;
    });

    //active menu function
    function activeMenu() {
        let pathname = window.location.pathname;
        let arrMenu = pathname.split("/");
        let currentMenu = arrMenu[2];
        $('li.nav-item a[data-active="'+currentMenu+'"]').addClass('my-active');
    }

    //
    function change_form_action(slb_selector, form_selector, id_btn_action) {

        var optValue;
        var isDelete = false;
        var pattenCheckDelete = new RegExp("delete", "i");

        $(slb_selector).on("change", function () {
            optValue = $(this).val();
            
            
            if(optValue !== "") {
                $(id_btn_action).removeAttr('disabled');
            } else {
                $(id_btn_action).attr('disabled', 'disabled');
            }
            $(form_selector).attr("action", optValue);
        });

        $(form_selector + " .btnAction").on("click", function () {
            isDelete = pattenCheckDelete.test($(slb_selector).val());
            if(isDelete){
                var confirmDelete = confirm('Are you really want to delete?');
                if(confirmDelete === false){
                    return;
                }
            }

            var numberOfChecked = $(form_selector + ' input[name="cid"]:checked').length;
            if (numberOfChecked == 0) {
                alert("Please choose some items");
                return;
            } else {
                var flag = false;
                var str = $(slb_selector + " option:selected").attr('data-comfirm');
               
                if (str != undefined) {

                    //Ki???m tra gi?? tr??? tr??? v??? khi user nh???n n??t tr??n popup
                    flag = confirm(str);
                    if (flag == false) {
                        return flag;
                    } else {
                        $(form_selector).submit();
                    }

                } else {
                    if (optValue != undefined) {
                        $(form_selector).submit();
                    }
                }
            }

        });
    }

    // hidden parent (hidden message notify)
    function hiddenNotify(close_btn_selector){
        $(close_btn_selector).on('click', function(){
            $(this).parent().css({'display':'none'});
        })    
    };
    //sweeet alert
    deleteItem=(link)=>{
    
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            
          }).then((result) => {
           console.log(result.value);
            if (result.value) {
                 window.location=link;
                
                console.log("1");
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    
    
          
     };

    //
    $('select[name="group_id"]').change(function(){
        $('input[name="group_name"]').val($(this).find('option:selected').text());
    
    });
    $('select[name="filter-group"]').change(function(){
        var path = window.location.pathname.split('/');
        var linkRedirect = "/" + path[1] + "/" + path[2] + '/filter-group/' + $(this).val();
       
            window.location.pathname =linkRedirect;
    });
    //
    $('select[name="category_id"]').change(function(){
        $('input[name="category_name"]').val($(this).find('option:selected').text());
    
    });
    $('select[name="filter-category"]').change(function(){
        var path = window.location.pathname.split('/');
        var linkRedirect = "/" + path[1] + "/" + path[2] + '/filter-category/' + $(this).val();
       
            window.location.pathname =linkRedirect;
    });
    
   
    

});
function ChangeToSlug()
{
    var title, slug;

    //L???y text t??? th??? input title 
    title = document.getElementById("name_slug").value;

    //?????i ch??? hoa th??nh ch??? th?????ng
    slug = title.toLowerCase();

    //?????i k?? t??? c?? d???u th??nh kh??ng d???u
    slug = slug.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/gi,'a');
    slug = slug.replace(/??|??|???|???|???|??|???|???|???|???|???/gi,'e');
    slug = slug.replace(/i|??|??|???|??|???/gi,'i');
    slug = slug.replace(/??|??|???|??|???|??|???|???|???|???|???|??|???|???|???|???|???/gi,'o');
    slug = slug.replace(/??|??|???|??|???|??|???|???|???|???|???/gi,'u');
    slug = slug.replace(/??|???|???|???|???/gi,'y');
    slug = slug.replace(/??/gi,'d');
    //X??a c??c k?? t??? ?????t bi???t
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //?????i kho???ng tr???ng th??nh k?? t??? g???ch ngang
    slug = slug.replace(/ /gi, "-");
    //?????i nhi???u k?? t??? g???ch ngang li??n ti???p th??nh 1 k?? t??? g???ch ngang
    //Ph??ng tr?????ng h???p ng?????i nh???p v??o qu?? nhi???u k?? t??? tr???ng
    slug = slug.replace(/\-\-\-\-\-/gi,'-');
    slug = slug.replace(/\-\-\-\-/gi,'-');
    slug = slug.replace(/\-\-\-/gi,'-');
    slug = slug.replace(/\-\-/gi,'-');
    //X??a c??c k?? t??? g???ch ngang ??? ?????u v?? cu???i
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    //In slug ra textbox c?? id ???slug???
    document.getElementById('slug').value = slug;
}
const changeStatus = (link) =>{
    $.ajax({
        type: "get",
        url: link,
        dataType:"json", 
        success: function(data){
            console.log(data);
            if(data.success){
                let linkChange = 'admin/articles/change-status/' +data.id + '/' + data.status;
                let classButton= data.status === 'active' ? 'btn-success' : 'btn-warning';
                let statusHtml = $(`#status-${data.id}`);
                $(statusHtml).html(`<a href="javascript:changeStatus('${linkChange}')" class="rounded-circle btn btn-sm ${classButton} alert-${data.id}"><i class="fas fa-check"></i></a>`);
                	// String
                $(`.alert-${data.id}`).notify(
                        "Updated",      
                        { position:"top",className:"success" }     
                );
                // Object
            }
        },
       
    });
};
const changeSpecial = (link) =>{
    $.ajax({
        type: "get",
        url: link,
        dataType:"json", 
        success: function(data){
            console.log(data);
            if(data.success){
                let linkChange = 'admin/articles/change-special/' +data.id + '/' + data.special;
                let classButton= data.special === 'active' ? 'success' : 'warning';
                let xhtmlName= data.special === 'active' ? 'special' : 'nomal';
                let specialHtml = $(`#special-${data.id}`);
                $(specialHtml).html(`<a href="javascript:changeSpecial('${linkChange}')"><span class="badge badge-${classButton} alert-special-${data.id}">${xhtmlName}</span></a>`);
                	// String
                $(`.alert-special-${data.id}`).notify(
                        "Updated",      
                        { position:"top",className:"success" }     
                );
                // Object
            }
        },
       
    });
};
const changeOrdering = (cid) =>{
    let domOrdering= document.getElementById(`ordering-${cid}`);
    domOrdering.classList.add(`alert-ordering-${cid}`);
    let ordering = domOrdering.value;
    $.ajax({
 
        type: "post",
        url: "admin/articles/change-ordering",
        dataType:"json", 
        data:{cid : cid,ordering : ordering},
        success: function(resolve){
            $(`.alert-ordering-${cid}`).notify(
                "Updated",      
                { position:"top",className:"success" }     
        );
        },
       
       
    });
}
